import { Kafka } from "kafkajs";
import { KafkaConsumerService } from "../common/kafka/consumer.service";
import { KafkaProducerService } from "../common/kafka/producer.service";

const kafka = new Kafka({
  clientId: "url-shortener-api",
  brokers: ["kafka:9092"],
});

export const kafkaConsumer = new KafkaConsumerService(kafka);
export const kafkaProducer = new KafkaProducerService(kafka);
