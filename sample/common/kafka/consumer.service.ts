import { Kafka, Consumer, EachMessagePayload } from "kafkajs";
import { errorLogger, infoLogger } from "../logger";

export class KafkaConsumerService {
  private consumer: Consumer;
  private readonly groupId = "url-shortener-group";
  private readonly topics = ["url-created", "url-deleted"];
  private kafka: Kafka;

  constructor(kafka: Kafka) {
    this.kafka = kafka;
    this.consumer = kafka.consumer({ groupId: this.groupId });
  }

  private async createTopicsIfNotExists(): Promise<void> {
    const admin = this.kafka.admin();
    try {
      await admin.connect();
      await admin.createTopics({
        topics: this.topics.map((topic) => ({
          topic,
          numPartitions: 1,
          replicationFactor: 1,
        })),
      });
    } catch (error: any) {
      console.log(`Error creating topics: ${error.message}`);

      if (!error.message.includes("already exists")) {
        throw error;
      }
    } finally {
      await admin.disconnect();
    }
  }

  async start(): Promise<void> {
    try {
      await this.createTopicsIfNotExists();
      await this.consumer.connect();
      await this.consumer.subscribe({ topics: this.topics });

      await this.consumer.run({
        eachMessage: async (payload: EachMessagePayload) => {
          const { topic, message } = payload;
          const value = message.value?.toString();

          if (!value) {
            infoLogger.warn(`Received empty message on topic ${topic}`);
            return;
          }

          try {
            const data = JSON.parse(value);
            await this.handleMessage(topic, data);
          } catch (error) {
            errorLogger.error(`Error processing message: ${error}`);
          }
        },
      });

      infoLogger.info("Kafka consumer started successfully");
    } catch (error) {
      errorLogger.error(`Failed to start Kafka consumer: ${error}`);
      throw error;
    }
  }

  private async handleMessage(topic: string, data: any): Promise<void> {
    switch (topic) {
      case "url-created":
        await this.handleUrlCreated(data);
        break;
      case "url-deleted":
        await this.handleUrlDeleted(data);
        break;
      default:
        infoLogger.warn(`Unknown topic: ${topic}`);
    }
  }

  private async handleUrlCreated(data: any): Promise<void> {
    try {
      infoLogger.info(`URL created: ${JSON.stringify(data)}`);
      // TODO: add logic here when migrate to microservices architecture
    } catch (error) {
      errorLogger.error(`Error handling url-created event: ${error}`);
    }
  }

  private async handleUrlDeleted(data: any): Promise<void> {
    try {
      infoLogger.info(`URL deleted: ${JSON.stringify(data)}`);
      // TODO: add logic here when migrate to microservices architecture
    } catch (error) {
      errorLogger.error(`Error handling url-deleted event: ${error}`);
    }
  }

  async shutdown(): Promise<void> {
    try {
      await this.consumer.disconnect();
      infoLogger.info("Kafka consumer disconnected");
    } catch (error) {
      errorLogger.error(`Error disconnecting Kafka consumer: ${error}`);
      throw error;
    }
  }
}
