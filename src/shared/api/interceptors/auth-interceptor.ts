"use client";

export type AuthInterceptor<T> = (input: T) => T;

export const authInterceptor: AuthInterceptor<string> = (x) => x;
