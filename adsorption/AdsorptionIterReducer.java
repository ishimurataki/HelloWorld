import org.apache.hadoop.mapreduce.*;
import org.apache.hadoop.mapreduce.Reducer.Context;

import java.io.IOException;
import java.util.HashMap;

import org.apache.hadoop.io.*;

public class SocialRankInitReducer extends Reducer<Text, Text, Text, Text> {
	
	@Override
	public void reduce(Text key, Iterable<Text> values, Context context) throws IOException, InterruptedException {
		// normalize weights and hard code origin to 1

		double sumOfWeights = 0.0;
		HashMap<String, Double> map = new HashMap<String, Double>();

		String valueToEmit = "";
		for (Text value: values) {
			if (value.toString().contains("*")) {
				valueToEmit = value.toString().substring(1);
			} else {
				String[] labelAndWeight = value.toString().split(",");
				String label = labelAndWeight[0];
				double weight = Double.valueOf(labelAndWeight[1]);
				sumOfWeights = sumOfWeights + weight;
				map.put(lable, weight);
			}
		}

		String keyToEmit = key.toString();
		if (map.isEmpty()) {
			context.write(new Text(keyToEmit), new Text(valueToEmit));
		} else {
			keyToEmit = keyToEmit + "-";
			String keyLatter = "";
			for (Map.Entry<String, Double> entry : map.entrySet()) {
				String strToAppend = "";
			    String label = entry.getKey();
			    double weight = entry.getValue();
			    double normWeight = weight / sumOfWeights;
			    
			    if (label.equals(key.toString())) {
			    	normWeight = 1.0;
			    }

			    if (keyLatter.length() == 0) {
			    	strToAppend = strToAppend + label + "," + Double.toString(normWeight);
			    	keyLatter = keyLatter + strToAppend;
			    } else {
			    	strToAppend = strToAppend + ";" + label + "," + Double.toString(normWeight);
			    	keyLatter = keyLatter + strToAppend;
			    }
			}

			keyToEmit = keyToEmit + keyLatter;

			context.write(new Text(keyToEmit), new Text(valueToEmit));
		}






	}
}