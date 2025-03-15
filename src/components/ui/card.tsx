import React from "react";
import { Card as AntCard } from "antd";

interface CardProps {
  title?: React.ReactNode;
  extra?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  variant?: "outlined" | "borderless";
  loading?: boolean;
  size?: "default" | "small";
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({
  title,
  extra,
  children,
  className = "",
  hoverable = false,
  variant = "outlined",
  loading = false,
  size = "default",
  style,
}) => {
  return (
    <AntCard
      title={title}
      extra={extra}
      className={`shadow-md rounded-lg ${className}`}
      hoverable={hoverable}
      variant={variant}
      loading={loading}
      size={size}
      style={style}
    >
      {children}
    </AntCard>
  );
};

export const CardHeader: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  return <div className={`mb-4 ${className}`}>{children}</div>;
};

export const CardTitle: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  return <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>;
};

export const CardDescription: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  return <p className={`text-sm text-gray-500 ${className}`}>{children}</p>;
};

export const CardContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  return <div className={className}>{children}</div>;
};

export const CardFooter: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  return <div className={`mt-4 pt-4 border-t ${className}`}>{children}</div>;
};

export default Card;
