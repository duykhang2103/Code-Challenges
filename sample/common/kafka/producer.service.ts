import { Kafka } from "kafkajs";
import { errorLogger, infoLogger } from "../logger";

export class KafkaProducerService {
  private producer;

  constructor(kafka: Kafka) {
    this.producer = kafka.producer();
  }

  async connect() {
    await this.producer.connect();
    infoLogger.info("Kafka Producer connected");
  }

  async sendMessage(topic: string, messages: any[]) {
    try {
      const result = await this.producer.send({
        topic,
        messages: messages.map((msg) => ({ value: JSON.stringify(msg) })),
      });
      return result;
    } catch (error) {
      errorLogger.error("Error sending message to Kafka:", error);
      throw error;
    }
  }

  async disconnect() {
    await this.producer.disconnect();
    infoLogger.info("Kafka Producer disconnected");
  }
}
