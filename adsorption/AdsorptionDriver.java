import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.mapreduce.Job;

// need to keep track of edges, weight of edge, curr weight of the label, 

// if user had no interets, make an interest called "nothing"

// input data format:
// name:interest,interest,interest,...

// interemediate data format:
// _key_: label-label,weight;label,weight \t name,weight;name,weight ...
// label (for name), curr weight of label \t interest,weight;interest,weight ...

// init mapper: get label : label, 

public class AdsorptionDriver {

	public static void init(String inputDir, String, outputDir) throw Exception {
		Job job = Job.getInstance();
		job.setJarByClass(AdsorptionDriver.class);
		FileInputFormat.addInputPath(job, new Path(inputDir));
		FileOutputFormat.setOutputPath(job, new Path(outputDir));

		// Set Mapper and Reducer classes
		job.setMapperClass(AdsorptionInitMapper.class);
		job.setReducerClass(AdsorptionInitReducer.class);

		// Set output types of the Mapper class
		job.setMapOutputKeyClass(Text.class);
		job.setMapOutputValueClass(Text.class);

		// Set output types of Reducer class
		job.setOutputKeyClass(Text.class);
		job.setOutputValueClass(Text.class);

		System.out.print(job.waitForCompletion(true) ? "Init Job Completed"
				: "Init Job Error");
		  
	}

	public static void iter(String inputDir, String, outputDir) throw Exception {
		Job job = Job.getInstance();
		job.setJarByClass(AdsorptionDriver.class);
		FileInputFormat.addInputPath(job, new Path(inputDir));
		FileOutputFormat.setOutputPath(job, new Path(outputDir));

		// Set Mapper and Reducer classes
		job.setMapperClass(AdsorptionIterMapper.class);
		job.setReducerClass(AdsorptionIterReducer.class);

		// Set output types of the Mapper class
		job.setMapOutputKeyClass(Text.class);
		job.setMapOutputValueClass(Text.class);

		// Set output types of Reducer class
		job.setOutputKeyClass(Text.class);
		job.setOutputValueClass(Text.class);

		System.out.print(job.waitForCompletion(true) ? "Iter Job Completed"
				: "Iter Job Error");
		  
	}

	public static void diff(String inputDir1, String inputDir2, String outputDir, int reducers) throw Exception {
		Job job = Job.getInstance();
		job.setJarByClass(AdsorptionDriver.class);
		FileInputFormat.addInputPath(job, new Path(inputDir1));
		FileInputFormat.addInputPath(job, new Path(inputDir2));
		FileOutputFormat.setOutputPath(job, new Path(outputDir));
		job.setNumReduceTasks(reducers);

		// Set Mapper and Reducer classes
		job.setMapperClass(AdsorptionDiffMapper.class);
		job.setReducerClass(AdsorptionDiffReducer.class);

		// Set output types of the Mapper class
		job.setMapOutputKeyClass(Text.class);
		job.setMapOutputValueClass(Text.class);

		// Set output types of Reducer class
		job.setOutputKeyClass(Text.class);
		job.setOutputValueClass(Text.class);

		System.out.print(job.waitForCompletion(true) ? "Diff Job Completed"
				: "Diff Job Error");
		  
	}

	public static void finish(String inputDir, String outputDir) throw Exception {
		Job job = Job.getInstance();
		job.setJarByClass(AdsorptionDriver.class);
		FileInputFormat.addInputPath(job, new Path(inputDir));
		FileOutputFormat.setOutputPath(job, new Path(outputDir));

		// Set Mapper and Reducer classes
		job.setMapperClass(AdsorptionFinishMapper.class);
		job.setReducerClass(AdsorptionFinishReducer.class);

		// Set output types of the Mapper class
		job.setMapOutputKeyClass(Text.class);
		job.setMapOutputValueClass(Text.class);

		// Set output types of Reducer class
		job.setOutputKeyClass(Text.class);
		job.setOutputValueClass(Text.class);

		System.out.print(job.waitForCompletion(true) ? "Diff Job Completed"
				: "Diff Job Error");
		  
	}

	public static void composite(String inputDir, String outputDir, String interDir1, 
			String interDir2, String diffDir) {
		
		deleteDirectory(interDir1);
		deleteDirectory(interDir2);
		deleteDirectory(diffDir);
		deleteDirectory(outputDir);

		double maxDifference = 99999999999.0;

		// put data into intermediate format
		init(inputDir, interDir1);

		int counter = 0;
		while (Double.compare(maxDifference, 0.9) > 0 ) {
			if (counter % 2 == 0) {
				iter(interDir1, interDir2);
			} else {
				iter(interDir2, interDir1);
			}

			if ((counter % 2 == 0) && (counter != 0)) {
				diff(interDir1, interDir2, diffDir, 10);
				maxDifference = readDiffResult(diffDir);
				deleteDirectory(diffDir);
			}

			// if counter is even, delete intermediate directory 1
			if (counter % 2 == 0) {
				deleteDirectory(interDir1);
			} else {
				deleteDirectory(interDir2);
			}
			
			counter++;
		}
	}


	public static void main(String[] args) throws Exception {

		System.out.println('Name: Matthew Kim; SEAS Login: mattmkim');

		if (args.length != 6) {
			System.err.println("Usage: AdsorptionDriver composite <inputDir> <outputDir> <interDir1> <interDir2> <diffDir>");
		    System.exit(-1);
		}

		composite(args[1], args[2], args[3], args[4], args[5]);
		
	}


	// Given an output folder, returns the first double from the first part-r-00000 file
    static double readDiffResult(String path) throws Exception {
	    double diffnum = 0.0;
	    Path diffpath = new Path(path);
	    Configuration conf = new Configuration();
	    FileSystem fs = FileSystem.get(URI.create(path),conf);
    
	    if (fs.exists(diffpath)) {
	    	FileStatus[] ls = fs.listStatus(diffpath);
	    	for (FileStatus file : ls) {
				if (file.getPath().getName().startsWith("part-r-")) {
					FSDataInputStream diffin = fs.open(file.getPath());
					BufferedReader d = new BufferedReader(new InputStreamReader(diffin));
					String diffcontent = d.readLine();
					double currDiff = Double.parseDouble(diffcontent);
					if (Double.compare(currDiff, diffnum) > 0) {
						diffnum = currDiff;
					}
					d.close();
				}
	     	}
	    }
	    
	    fs.close();
	    return diffnum;
    }


	static void deleteDirectory(String path) throws Exception {
    	
    	Path todelete = new Path(path);
    	Configuration conf = new Configuration();
    	FileSystem fs = FileSystem.get(URI.create(path), conf);
    
    	if (fs.exists(todelete)) {
   	 		fs.delete(todelete, true);
    	}
      
    	fs.close();
  }
}
