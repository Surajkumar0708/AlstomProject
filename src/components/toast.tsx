import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface ToastProps {
  message: string;
  duration?: number;
  onHide?: () => void;
  show: boolean;
}

const Toast = ({message, duration = 3000, onHide, show}: ToastProps) => {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onHide?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onHide]);

  if (!visible) return null;

  return (
    <View style={styles.toastContainer}>
      <Text style={styles.toastText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
    zIndex: 999,
  },
  toastText: {
    color: 'white',
    fontSize: 14,
  },
});

export default Toast;
