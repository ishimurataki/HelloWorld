import org.apache.hadoop.mapreduce.*;
import org.apache.hadoop.mapreduce.Reducer.Context;

import java.io.IOException;
import java.util.PriorityQueue;

import org.apache.hadoop.io.*;

public class AdsorptionFinishReducer extends Reducer<Text, Text, Text, Text> {
	
	@Override
	public void reduce(Text key, Iterable<Text> values, Context context) throws IOException, InterruptedException {

		
		for (Text value: values) {
			
		}
	}
}