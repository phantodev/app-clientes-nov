import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import type { Area } from "react-easy-crop";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@heroui/react";
import { useMainStore } from "@/stores/main.store";

interface ModalAvatarCropProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  image: File | null;
}

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.src = url;
  });

async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area
): Promise<string> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2d context");
  }

  const size = pixelCrop.width;
  canvas.width = size;
  canvas.height = size;

  ctx.save();
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  ctx.clip();

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    size,
    size
  );

  ctx.restore();

  // Retorna a imagem como Base64
  return canvas.toDataURL("image/png");
}

export default function ModalAvatarCrop(props: ModalAvatarCropProps) {
  const imageUrl = props.image ? URL.createObjectURL(props.image) : null;
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const { setTempAvatar } = useMainStore();

  const onCropComplete = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleClose = () => {
    props.onOpenChange(false);
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }
  };

  const handleConfirm = async () => {
    if (!imageUrl || !croppedAreaPixels || !props.image) {
      return;
    }

    try {
      const croppedImageBase64 = await getCroppedImg(imageUrl, croppedAreaPixels);
      setTempAvatar(croppedImageBase64);
      handleClose();
    } catch (error) {
      console.error("Erro ao processar imagem:", error);
    }
  };

  return (
    <Modal 
      isOpen={props.isOpen} 
      onOpenChange={props.onOpenChange}
      size="2xl"
      placement="center"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Editar Foto de Perfil
            </ModalHeader>
            <ModalBody>
              {imageUrl && (
                <div className="flex flex-col gap-4">
                  <div className="relative w-full h-[400px] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                    <Cropper
                      image={imageUrl}
                      crop={crop}
                      zoom={zoom}
                      aspect={1}
                      onCropChange={setCrop}
                      onZoomChange={setZoom}
                      onCropComplete={onCropComplete}
                      cropShape="round"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Zoom: {Math.round(zoom * 100)}%
                    </label>
                    <input
                      type="range"
                      min={1}
                      max={3}
                      step={0.1}
                      value={zoom}
                      onChange={(e) => setZoom(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary-500"
                    />
                  </div>
                </div>
              )}
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Aqui você pode fazer o crop da imagem antes de salvar.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancelar
              </Button>
              <Button color="primary" onPress={handleConfirm}>
                Confirmar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

