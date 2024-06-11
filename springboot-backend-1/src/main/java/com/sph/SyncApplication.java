package com.sph;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

//import org.springframework.boot.SpringApplication;
//import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SyncApplication {

	public static void main(String[] args) {
		SpringApplication.run(SyncApplication.class, args);
	}

	/*
	 * @Configuration public class CorsConfiguration implements WebMvcConfigurer {
	 * 
	 * @Override public void addCorsMappings(CorsRegistry registry) {
	 * registry.addMapping("/**").allowedOrigins("http://localhost:5174") // Allow
	 * requests from frontend URL .allowedMethods("GET", "POST", "PUT", "DELETE",
	 * "OPTIONS") // Allow specific HTTP methods .allowedHeaders("*"); // Allow all
	 * headers } }
	 */

	@RestController
	@CrossOrigin("*")
	public static class FolderSyncController {

		@PostMapping("/sync-folders")
		public List<String> syncFolders(@RequestBody FolderPaths folderPaths) throws InterruptedException {
			long start = System.currentTimeMillis();
			List<String> reportData = new ArrayList<>();

			String sourcePath = folderPaths.getSourcePath();
			String targetPath = folderPaths.getTargetPath();

			File sourceDirectory = new File(sourcePath);
			File targetDirectory = new File(targetPath);
			

			// Check if source and target directories exist
			if (!sourceDirectory.exists() || !sourceDirectory.isDirectory() || !targetDirectory.exists()
					|| !targetDirectory.isDirectory()) {
				reportData.add("Invalid source or target directory path.");
				return reportData;

			}

			// Perform folder synchronization
			FileSyncing(sourceDirectory, targetDirectory.getPath(), reportData);

			// Write the synchronization report to a file
			writeReportToFile(reportData);
			Thread.sleep(10000);
			long end = System.currentTimeMillis();
			System.out.println("start time :: " + start + "  ::::::::  end time  :: " + end);

			// long end = System.currentTimeMillis(); // Record end time
			Double elapsedTimeMillis = (double) ((end - start) / 1000); // Calculate elapsed time in milliseconds

			// Convert elapsed time to seconds
			// long elapsedTimeSeconds = TimeUnit.MILLISECONDS.toSeconds(elapsedTimeMillis);
			System.out.println("Response time: " + elapsedTimeMillis + " seconds");
			
			// Calculate and log the size of the target folder
            System.out.println("Target folder size: " + getFolderSizeMegaBytes(targetDirectory) + " mb");
            
			return reportData;
		}
		
		private Long getFolderSizeMegaBytes(File targetDirectory) {
			// TODO Autopublic static long folderSize(File directory) {
		    long length = 0;
		    for (File file : targetDirectory.listFiles()) {
		        if (file.isFile())
		            length += file.length();
		        else
		            length += getFolderSizeMegaBytes(file);
		    }
		    return length;
		}

		private void FileSyncing(File sourceFile, String targetPath, List<String> reportData) {
			// Implement your file syncing logic here
			// This method should be the same as your original FileSyncing method
			File targetFile = new File(targetPath);
			File[] listoftarget = targetFile.listFiles();
			if (sourceFile.isDirectory()) {

				// Check if file exists in Target File or Not
				if (!targetFile.exists()) {
					//
					System.out.println(targetFile + "-Missing in target");
					try {
						copyFiles(sourceFile, targetPath);
						reportData
								.add("Directory: " + sourceFile.getName() + " Added to " + targetFile.getParentFile());
					} catch (Exception e) {
						System.out.println("Error");
					}
				} else {

				}
				File[] files = sourceFile.listFiles();
				if (files != null) {
					for (File file : files) {
						FileSyncing(file, targetPath + "/" + file.getName(), reportData);
					}
					for (File targetfile : targetFile.listFiles()) {
						File sourcefile = new File(sourceFile, targetfile.getName());
						if (!sourcefile.exists()) {
							targetfile.delete();
							reportData.add(targetfile.getName() + "is deleted from Target");
						}
					}
				}
			} else {
				if (!targetFile.exists()) {
					System.out.println(targetFile + "-Missing in target");
					try {
						copyFiles(sourceFile, targetPath);
						reportData.add("File " + sourceFile.getName() + " Added to " + targetFile.getParentFile());
					} catch (Exception e) {
						System.out.println("Error");
					}
				} else if (targetFile.length() != sourceFile.length()) {
					if (targetFile.lastModified() < sourceFile.lastModified()) {
						System.out.println(targetFile + "-old in target");
						try {
							targetFile.delete();
							copyFiles(sourceFile, targetPath);
							reportData
									.add("File " + sourceFile.getName() + " Updated in " + targetFile.getParentFile());
						} catch (IOException e) {
							e.printStackTrace();
						}
					} else {
						System.out.println(targetFile + "- Latest in target");
						reportData.add("File " + sourceFile.getName() + " latest in " + targetFile.getParentFile()
								+ " No Change");
					}
				} else if (targetFile.lastModified() < sourceFile.lastModified()) {
					System.out.println(targetFile + "-old in target");
					try {
						targetFile.delete();
						copyFiles(sourceFile, targetPath);
						reportData.add("File " + sourceFile.getName() + " Updated in " + targetFile.getParentFile());
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
			}
		}

		public static void copyFiles(File file, String targetPath) throws IOException {
			Files.copy(file.toPath(), new File(targetPath).toPath());

		}

		private void writeReportToFile(List<String> reportData) {
			String currentDate = new SimpleDateFormat("dd-MM-yyyy HH-mm-ss").format(new Date());
			File reportFile = new File("/Users/admin/Desktop/ReportTime/" + currentDate);

			try (FileWriter writer = new FileWriter(reportFile)) {
				for (String data : reportData) {
					writer.write(data + "\n");
				}
			} catch (IOException e) {
				e.printStackTrace();
			}	

		}
		
	}

	public static class FolderPaths {
		private String sourcePath;
		private String targetPath;

		public String getSourcePath() {
			return sourcePath;
		}

		public void setSourcePath(String sourcePath) {
			this.sourcePath = sourcePath;
		}

		public String getTargetPath() {
			return targetPath;
		}

		public void setTargetPath(String targetPath) {
			this.targetPath = targetPath;
		}
	}

}