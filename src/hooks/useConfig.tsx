import { useState, useEffect } from "react";

type Config = {
  minimumFileUploadSize: number;
};

const useConfig = (): {
  config: Config | null;
  error: string | null;
  loading: boolean;
} => {
  const [config, setConfig] = useState<Config | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch("/config.json");
        if (!response.ok) {
          throw new Error(`Failed to fetch config: ${response.statusText}`);
        }
        const data: Config = await response.json();
        setConfig(data);
      } catch (err: unknown) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  return { config, error, loading };
};

export default useConfig;
