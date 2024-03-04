// TODO: fix it to actually call the OpenAI API

interface CreateVideoProps {
    imageVideo: File[];
    brandName: string;
    tags: string[];
    customPrompts:string;
}

export const CreateVideo = async ({
    imageVideo,
    brandName,
    tags,
    customPrompts
}: CreateVideoProps): Promise<void> => {
    const formData = new FormData();
    imageVideo.forEach((file) => formData.append("imageVideo[]", file)); // Append each file to formData
    formData.append("brandName", brandName);
    formData.append("tags", JSON.stringify(tags));
    formData.append("customPrompts", customPrompts);

    try {
        const response = await fetch("YOUR_API_ENDPOINT", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`API call failed: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Success",data);
    } catch (error) {
        console.error(error)
        // actually handle error 
    }
};