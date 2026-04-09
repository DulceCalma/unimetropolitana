
CREATE TABLE public.game_rankings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  speed TEXT NOT NULL CHECK (speed IN ('relax', 'normal', 'fast', 'extreme')),
  score INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (name, speed)
);

ALTER TABLE public.game_rankings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view rankings"
  ON public.game_rankings FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert rankings"
  ON public.game_rankings FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update rankings"
  ON public.game_rankings FOR UPDATE
  USING (true);
