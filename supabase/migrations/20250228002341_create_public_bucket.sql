-- Create a storage bucket for public files
INSERT INTO storage.buckets (id, name, public)
VALUES ('public', 'public_bucket', true);

-- Allow public access to files in the public bucket
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'public_bucket');

-- Allow authenticated users to upload files to public bucket
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'public_bucket'
    AND auth.role() = 'authenticated'
);

-- Allow users to update and delete their own files
CREATE POLICY "Users can update their own files"
ON storage.objects FOR UPDATE
USING (
    bucket_id = 'public_bucket'
    AND auth.uid() = owner
);

CREATE POLICY "Users can delete their own files"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'public_bucket'
    AND auth.uid() = owner
);
