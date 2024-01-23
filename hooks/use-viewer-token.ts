import { toast } from "sonner";
import { useState, useEffect } from "react";
import { type JwtPayload, jwtDecode } from "jwt-decode";
import { createViewerToken } from "@/actions/token";

export const useViewerToken = (hostIdentity: string) => {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [identity, setIdentity] = useState("");

  useEffect(() => {
    const createToken = async () => {
      try {
        const viewerToken = await createViewerToken(hostIdentity);

        setToken(viewerToken);

        const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
          name?: string;
        };
        const jwtName = decodedToken?.name;
        const jwtId = decodedToken.jti;

        if (jwtId) {
          setIdentity(jwtId);
        }

        if (jwtName) {
          setName(jwtName);
        }
      } catch (error) {
        toast.error("Something Went Wrong!");
        console.log("[createToken]: Token Creation Failed!");
      }
    };

    createToken();
  }, [hostIdentity]);

  return { token, name: name, identity: identity };
};
