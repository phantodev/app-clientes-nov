import axios from "axios";

export const uploadService = {
  async uploadMultipleImages(files: File[]): Promise<any> {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const formData = new FormData();
      files.forEach(file => {
        formData.append('files', file);
      });
      formData.append('name', 'Eduardo Burko');
      formData.append('email', 'eduardo@burko.com');
      formData.append('password', '123456');
      formData.append('confirmPassword', '123456');
      formData.append('avatar', 'https://via.placeholder.com/150');
      formData.append('role', 'admin');
      formData.append('status', 'active');
      formData.append('createdAt', new Date().toISOString());
      formData.append('updatedAt', new Date().toISOString());
      const response = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
  },
};