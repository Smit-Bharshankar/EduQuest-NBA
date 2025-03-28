import conf from "../Conf/conf";
import { Client, Account, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client.setEndpoint(conf.appwriteURL).setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  // Upload Avatar Function
  async uploadAvatar(file) {
    try {
      const response = await this.storage.createFile(
        conf.appwriteBucketId, // Storage Bucket ID from conf
        ID.unique(), // Generate unique file ID
        file
      );

      console.log("File uploaded successfully:", response);
      return response.$id; // Return file ID to store in MongoDB
    } catch (error) {
      console.error("Upload failed:", error);
      throw error;
    }
  }

  // Get Profile Picture URL
  getAvatarUrl(fileId) {
    return this.storage.getFilePreview(conf.appwriteBucketId, fileId);
  }

  // Delete avatar
  async deleteAvatar(fileId) {
    try {
      await this.storage.deleteFile(process.env.APPWRITE_BUCKET_ID, fileId);
      console.log("Avatar deleted successfully");
    } catch (error) {
      console.error("Error deleting avatar:", error);
    }
  }
}

const AppwriteService = new Service();

export default AppwriteService;
