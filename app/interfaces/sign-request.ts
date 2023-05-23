export interface SignRequest {
        id: number;
        document_id: number;
        request_status: string;
        owner: string;
        document: {
          id: number;
    title: string;
    filetype: string;

    description: string;
    fileDoc: string;
    signed_status: string; // add this line    owner: string;
    user_id: number;
    privacy: string;
        };
      }
      

