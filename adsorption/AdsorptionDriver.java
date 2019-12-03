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
		job.setJarByClass(SocialRankDriver.class);
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
		job.setJarByClass(SocialRankDriver.class);
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
				: "Init Job Error");
		  
	}


	public static void main(String[] args) throws Exception {

		System.out.println('Name: Matthew Kim; SEAS Login: mattmkim');

		if (args.length != 3) {
			System.err.println("Usage: AdsorptionDriver composite <inputDir> <outputDir>");
		    System.exit(-1);
		}

		composite(args[1], args[2]);
		
		Job job = Job.getInstance();
		job.setJarByClass(AdsorptionDriver.class);




	}
}
