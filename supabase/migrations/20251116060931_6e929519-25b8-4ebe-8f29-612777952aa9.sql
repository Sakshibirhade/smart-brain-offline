-- Allow users to delete their own doubts
CREATE POLICY "Users can delete their own doubts" 
ON public.doubts 
FOR DELETE 
USING (auth.uid() = user_id);