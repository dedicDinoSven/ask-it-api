DROP TABLE IF EXISTS public.ratings;
DROP TABLE IF EXISTS public.answers;
DROP TABLE IF EXISTS public.questions;
DROP TABLE IF EXISTS public.users;

CREATE TABLE public.users (
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(255),
    "lastName" VARCHAR(255),
    "createdAt" TIMESTAMP DEFAULT(CURRENT_TIMESTAMP),
    "updatedAt" TIMESTAMP DEFAULT(CURRENT_TIMESTAMP));

CREATE TABLE public.questions (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(255) NOT NULL,
    "text" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP DEFAULT(CURRENT_TIMESTAMP),
    "updatedAt" TIMESTAMP DEFAULT(CURRENT_TIMESTAMP),
    "userId" INTEGER NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY("userId") REFERENCES public.users("id") ON UPDATE CASCADE ON DELETE CASCADE);

CREATE TABLE public.answers(
    "id" SERIAL PRIMARY KEY,
    "text" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP DEFAULT(CURRENT_TIMESTAMP),
    "updatedAt" TIMESTAMP DEFAULT(CURRENT_TIMESTAMP),
    "userId" INTEGER NOT NULL,
    "questionId" INTEGER NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY("userId") REFERENCES public.users("id") ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_question FOREIGN KEY("questionId") REFERENCES public.questions("id") ON UPDATE CASCADE ON DELETE CASCADE);

CREATE TABLE public.ratings(
    "id" SERIAL PRIMARY KEY,
    "value" INTEGER NOT NULL,
    "createdAt" TIMESTAMP DEFAULT(CURRENT_TIMESTAMP),
    "updatedAt" TIMESTAMP DEFAULT(CURRENT_TIMESTAMP),
    "userId" INTEGER NOT NULL,
    "questionId" INTEGER,
    "answerId" INTEGER,
    CONSTRAINT fk_user FOREIGN KEY("userId") REFERENCES public.users("id") ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_question FOREIGN KEY("questionId") REFERENCES public.questions("id") ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_answer FOREIGN KEY("answerId") REFERENCES public.answers("id") ON UPDATE CASCADE ON DELETE CASCADE);