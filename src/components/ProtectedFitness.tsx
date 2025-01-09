import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedFitnessProps {
  children: React.ReactNode;
}

const ProtectedFitness = ({ children }: ProtectedFitnessProps) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/plans" replace />;
  }

  return <>{children}</>;
};

export default ProtectedFitness;
