import org.apache.hadoop.mapreduce.*;
import java.io.IOException;

import org.apache.hadoop.io.*;

public class AdsorptionIterMapper extends Mapper<LongWritable, Text, Text, Text> {

	@Override
	public void map(LongWritable key, Text value, Context context) throws IOException, InterruptedException {
		String[] interestOrName = value.toString().split("\t");
		if (interestOrName[0].contains("-")) {
			String[] originAndLabelWeights = interestOrName[0].split("-");
			String origin = originAndLabelWeights[0];
			String labelWeights = originAndLabelWeights[1];
			String[] labelWeightsArr = labelWeights.split(";");

			String[] labelWeightsEdges = interestOrName[1].split(";");

			for (int i = 0; i < labelWeightsArr.length; i++) {
				String[] labelAndWeight = labelWeightsArr[i].split(",");
				String label = labelAndWeight[0];
				String weight = labelAndWeight[1];
				double weightOfLabel = Double.valueOf(weight);

				for (int j = 0; j < labelWeightsEdges.length; j++) {
					String labelAndWeightEdge = labelWeightsEdges.split(",");
					String labelEdge = labelAndWeightEdge[0];
					String labelWeight = labelAndWeightEdge[1];
					double weightOfLabelEdge = Double.valueOf(lableWeight);

					double weightToSend = weightOfLabel * weightOfLabelEdge;
					String keyToEmit = labelEdge;
					String valueToEmit = label + "," + Double.toString(weightToSend);

				}


			}

		} else {
			String origin = interestOrName[0];
		}
		String[] interestOrNameRank = interestOrName[0].split(",");
		String[] neighbors = interestOrName[1].split(";");
		String interestOrName = interestOrNameRank[0];
		String rank = interestOrNameRank[1];
		int numNeighbors = neighbors.length;


	}
}