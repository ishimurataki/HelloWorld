import org.apache.hadoop.mapreduce.*;
import org.apache.hadoop.mapreduce.Reducer.Context;

import java.io.IOException;
import java.util.PriorityQueue;

import org.apache.hadoop.io.*;

public class AdsorptionFinishReducer extends Reducer<Text, Text, Text, Text> {

	public class Node<String,Double> implements Comparable<Node<String, Double>> {

		String key;
		Double value;
		Node<String, Double> nextNode;

		public Node<String, Double>(String label, Double weight, Node<String, Double> nextNode) {
			this.key = label;
			this.value = weight;
			this.nextNode = nextNode;
		}

		public String getKey() {
			return this.key;
		}

		public Double getValue() {
			return this.value;
		}

		public Node<String, Double> getNextNode() {
			return this.nextNode;
		}

		@Override
		public int compareTo(Node<String, Double> node) {
			if (Double.compare(this.getValue(), node.getValue()) > 0) {
				return 1;
			} else if (Double.compare(this.getValue(), node.getValue()) == 0) {
				return 0;
			} else {
				return - 1;
			}
		}
	}

	
	@Override
	public void reduce(Text key, Iterable<Text> values, Context context) throws IOException, InterruptedException {

		PriorityQueue<Node<String, Double>> pq = new PriorityQueue<Node<String, Double>>(Collections.reverseOrder());

		for (Text value: values) {
			String label = value.split(",")[0];
			double weight = Double.valueOf(value.split(",")[1]);

			Node<String, Double> node = new Node<String, Double>(label, weight);
			pq.add(node);
		}

		String valueToEmit = "";

		while (pq.size() > 0) {
			Node<String, Double> node = pq.poll();
			String label = node.getKey();
			double weight = node.getValue();
			if (valueToEmit.length() == 0) {
				String strAppend = label + "," + Double.toString(weight);
				valueToEmit = valueToEmit + strAppend;
			} else {
				String strAppend = ";" + label + "," + Double.toString(weight);
				valueToEmit = valueToEmit + strAppend;
			}
		}

		context.write(key, new Text(valueToEmit));
	}
}