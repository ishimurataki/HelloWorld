import org.apache.hadoop.mapreduce.*;
import org.apache.hadoop.mapreduce.Reducer.Context;

import java.io.IOException;

import org.apache.hadoop.io.*;
import java.util.ArrayList;


public class AdsorptionDiffReducer extends Reducer<Text, Text, Text, Text> {

	double maxDiff = -Double.MAX_DOUBLE;
	
	@Override
	public void reduce(Text key, Iterable<Text> values, Context context) throws IOException, InterruptedException {
		
		ArrayList<String> adsorpValues = new ArrayList<String>();
		for (Text value: values) {
			adsorpValues.add(value.toString());
		}

		double adsorpVal1 = 0.0;
		double adsorpVal2 = adsorpValues.get(0);
		if (adsorpValues.size() == 2) {
			adsorpValues.get(1);
		}

		double difference = Math.abs(adsorpVal2 - adsorpVal1);

		if (Double.compare(difference, maxDiff) > 0) {
			maxDiff = difference;
		}


	}

	@Override
	protected void cleanup(Context context) throws IOException, InterruptedException {
    	context.write(new Text(String.valueOf(maxDiff)), new Text(""));
  	}

}