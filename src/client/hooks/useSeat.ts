import { useState } from 'react';

export const useSeat = () => {

  const [loading, setLoading] = useState(false);

  const handlePress = async (onPress: () => void) => {
    try {
      setLoading(true);
      onPress();
    } finally {
      setLoading(false);
    }
  };

  return { loading, handlePress };
};
