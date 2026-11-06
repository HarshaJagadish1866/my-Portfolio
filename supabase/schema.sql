-- ==============================================================================
-- Portfolio Database Schema & Row Level Security (RLS) Policies
-- Run this entire script in Supabase: Project Dashboard -> SQL Editor -> New Query
-- ==============================================================================

-- 1. Table: contact_messages
-- Stores messages submitted through the website contact form.
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public visitors to submit messages
DROP POLICY IF EXISTS "Allow public insert into contact_messages" ON public.contact_messages;
CREATE POLICY "Allow public insert into contact_messages"
ON public.contact_messages
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Note: No SELECT policy is created for public/anon.
-- This guarantees that NO visitor or script can read other people's contact messages.
-- You can view all received messages safely in your Supabase Dashboard Table Editor.


-- 2. Table: guestbook
-- Allows visitors to leave public notes (only visible after you set approved = true).
CREATE TABLE IF NOT EXISTS public.guestbook (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    message TEXT NOT NULL,
    approved BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.guestbook ENABLE ROW LEVEL SECURITY;

-- Policy: Allow visitors to submit new guestbook entries
DROP POLICY IF EXISTS "Allow public insert into guestbook" ON public.guestbook;
CREATE POLICY "Allow public insert into guestbook"
ON public.guestbook
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Policy: Only allow public to read entries that you have approved
DROP POLICY IF EXISTS "Allow public read for approved guestbook entries" ON public.guestbook;
CREATE POLICY "Allow public read for approved guestbook entries"
ON public.guestbook
FOR SELECT
TO anon, authenticated
USING (approved = true);


-- 3. Table: project_views
-- Tracks live view counts for Arbitr-AI and Voyager.
CREATE TABLE IF NOT EXISTS public.project_views (
    project_slug TEXT PRIMARY KEY,
    count BIGINT NOT NULL DEFAULT 1,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.project_views ENABLE ROW LEVEL SECURITY;

-- Policy: Allow visitors to read project view counts
DROP POLICY IF EXISTS "Allow public read on project_views" ON public.project_views;
CREATE POLICY "Allow public read on project_views"
ON public.project_views
FOR SELECT
TO anon, authenticated
USING (true);

-- 4. Function: increment_project_views
-- Safely increments the project counter without giving public write access to the table.
CREATE OR REPLACE FUNCTION public.increment_project_views(p_slug TEXT)
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    new_count BIGINT;
BEGIN
    INSERT INTO public.project_views (project_slug, count, updated_at)
    VALUES (p_slug, 1, NOW())
    ON CONFLICT (project_slug)
    DO UPDATE SET count = public.project_views.count + 1, updated_at = NOW()
    RETURNING count INTO new_count;
    
    RETURN new_count;
END;
$$;

-- Grant execution permissions to public/anon users
GRANT EXECUTE ON FUNCTION public.increment_project_views(TEXT) TO anon, authenticated;
