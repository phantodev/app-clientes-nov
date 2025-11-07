import { useEffect, useState } from "react";
import {useDropzone} from 'react-dropzone';
import type { FileWithPreview } from '@/type/file';
import { Button } from "@heroui/button";
import { uploadService } from "@/services/upload.service";
import { useMutation } from "@tanstack/react-query";

export default function Dropzone() {
    const [files, setFiles] = useState<FileWithPreview[]>([]);
    const {getRootProps, getInputProps} = useDropzone({
      accept: {
        'image/*': []
      },
      onDrop: (acceptedFiles: File[]) => {
        const newFiles = acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        }) as FileWithPreview);
        
        setFiles(prevFiles => [...prevFiles, ...newFiles]);
      }
    });

    const handleRemoveFile = (fileToRemove: FileWithPreview) => {
      // Revogar a URL do objeto para evitar memory leaks
      URL.revokeObjectURL(fileToRemove.preview);
      // Remover o arquivo do estado usando a forma funcional para garantir estado atualizado
      setFiles(prevFiles => prevFiles.filter(file => file.name !== fileToRemove.name));
    };
    
    const thumbs = files.map(file => (
      <div key={file.name} className="relative inline-flex flex-col items-center">
        <div className="inline-flex rounded border border-gray-200 mb-2 mr-2 w-24 h-24 p-1 box-border">
          <div className="flex min-w-0 overflow-hidden">
            <img
              src={file.preview}
              className="block w-auto h-full"
              alt={file.name}
              // Revoke data uri after image is loaded
              onLoad={() => { URL.revokeObjectURL(file.preview) }}
            />
          </div>
        </div>
        <button
          type="button"
          onClick={() => handleRemoveFile(file)}
          className="text-xs text-red-600 hover:text-red-800 cursor-pointer underline"
        >
          Excluir
        </button>
      </div>
    ));

    const { mutate: uploadMultipleImages, isPending } = useMutation({
      mutationKey: ['uploadMultipleImages'],
      mutationFn: (files: File[]) => uploadService.uploadMultipleImages(files),
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.error(error);
      }
    });

    const handleUpload = async () => {
      uploadMultipleImages(files);
    };
  
    useEffect(() => {
      // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
      return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);
  
    return (
      <section className="container p-4">
        <div 
          {...getRootProps({
            className: 'border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer transition-all duration-200 hover:border-blue-400 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
          })}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-4">
            <svg 
              className="w-16 h-16 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" 
              />
            </svg>
            <p className="text-lg font-medium text-gray-700">
              Arraste e solte arquivos aqui, ou clique para selecionar
            </p>
            <p className="text-sm text-gray-500">
              Apenas imagens são aceitas
            </p>
          </div>
        </div>
        <aside className="flex flex-row flex-wrap mt-4 gap-2">
          {thumbs}
        </aside>
        <div>
            <Button isLoading={isPending} isDisabled={isPending} onPress={handleUpload}>Upload</Button>
        </div>
      </section>
    );
}