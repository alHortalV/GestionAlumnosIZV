import { useState } from 'react';

export const useSeat = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePress = async (isOccupied: boolean, onPress: () => void) => {
    try {
      setLoading(true);
      if (isOccupied) {
        setModalVisible(true);
      }
      onPress();
    } finally {
      setLoading(false);
    }
  };

  return { modalVisible, setModalVisible, loading, handlePress };
};
