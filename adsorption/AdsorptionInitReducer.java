import org.apache.hadoop.mapreduce.*;
import org.apache.hadoop.mapreduce.Reducer.Context;

import java.io.IOException;

import org.apache.hadoop.io.*;

public class SocialRankInitReducer extends Reducer<Text, Text, Text, Text> {
	
	@Override
	public void reduce(Text key, Iterable<Text> values, Context context) throws IOException, InterruptedException {
		
		double numInterests = 0.0; 
		LinkedList<String> interests = new LinkedList<String>();
		for (Text value: values) {
			String interest = value.toString();
			interests.push(interest);
			numInterests++;

		}

		double weightEdge = 1.0 / numInterests;
		String keyToEmit = key.toString() + ',' + Integer.toString(1);
		String valueToEmit = "";
		while (!interests.isEmpty()) {
			String interestToAdd = interests.pollFirst();
			String stringAppend = "";
			if (valuetoEmit.length == 0) {
				stringAppend = stringAppend + interestToAdd + ',' + Double.toString(weightEdge);
				valueToEmit = valueToEmit + stringAppend;
			} else {
				stringAppend = stringAppend + ";" + interestToAdd + ',' + Double.toString(weightEdge);
				valueToEmit = valueToEmit + stringAppend;
			}
		}

		context.write(new Text(keyToEmit), new Text(valueToEmit));

	}
}