-- Insere os jogos do mata-mata (73-104) na tabela matches.
-- Rode UMA vez no SQL Editor do Supabase.

insert into public.matches (id, grp, match_date, match_time, home_team, away_team, venue) values
  (73, NULL, '2026-06-28', '12:00', 'África do Sul', 'Canadá', 'SoFi Stadium, Los Angeles'),
  (74, NULL, '2026-06-29', '16:30', 'Alemanha', 'Paraguai', 'Gillette Stadium, Boston'),
  (75, NULL, '2026-06-29', '19:00', 'Holanda', 'Marrocos', 'Estádio BBVA, Monterrey'),
  (76, NULL, '2026-06-29', '12:00', 'Brasil', 'Japão', 'NRG Stadium, Houston'),
  (77, NULL, '2026-06-30', '17:00', 'França', 'Suécia', 'MetLife Stadium, Nova York/Nova Jersey'),
  (78, NULL, '2026-06-30', '12:00', 'Costa do Marfim', 'Noruega', 'AT&T Stadium, Dallas'),
  (79, NULL, '2026-06-30', '19:00', 'México', 'Equador', 'Estádio Azteca, Cidade do México'),
  (80, NULL, '2026-07-01', '12:00', 'Inglaterra', 'RD Congo', 'Mercedes-Benz Stadium, Atlanta'),
  (81, NULL, '2026-07-01', '17:00', 'Estados Unidos', 'Bósnia e Herzegovina', 'Levi''s Stadium, San Francisco'),
  (82, NULL, '2026-07-01', '13:00', 'Bélgica', 'Senegal', 'Lumen Field, Seattle'),
  (83, NULL, '2026-07-02', '19:00', 'Portugal', 'Croácia', 'BMO Field, Toronto'),
  (84, NULL, '2026-07-02', '12:00', 'Espanha', 'Áustria', 'SoFi Stadium, Los Angeles'),
  (85, NULL, '2026-07-02', '20:00', 'Suíça', 'Argélia', 'BC Place, Vancouver'),
  (86, NULL, '2026-07-03', '18:00', 'Argentina', 'Cabo Verde', 'Hard Rock Stadium, Miami'),
  (87, NULL, '2026-07-03', '20:30', 'Colômbia', 'Gana', 'Arrowhead Stadium, Kansas City'),
  (88, NULL, '2026-07-03', '13:00', 'Austrália', 'Egito', 'AT&T Stadium, Dallas'),
  (89, NULL, '2026-07-04', '17:00', 'Vencedor Jogo 74', 'Vencedor Jogo 77', 'Lincoln Financial Field, Filadélfia'),
  (90, NULL, '2026-07-04', '12:00', 'Canadá', 'Vencedor Jogo 75', 'NRG Stadium, Houston'),
  (91, NULL, '2026-07-05', '16:00', 'Vencedor Jogo 76', 'Vencedor Jogo 78', 'MetLife Stadium, Nova York/Nova Jersey'),
  (92, NULL, '2026-07-05', '18:00', 'Vencedor Jogo 79', 'Vencedor Jogo 80', 'Estádio Azteca, Cidade do México'),
  (93, NULL, '2026-07-06', '14:00', 'Vencedor Jogo 83', 'Vencedor Jogo 84', 'AT&T Stadium, Dallas'),
  (94, NULL, '2026-07-06', '17:00', 'Vencedor Jogo 81', 'Vencedor Jogo 82', 'Lumen Field, Seattle'),
  (95, NULL, '2026-07-07', '12:00', 'Vencedor Jogo 86', 'Vencedor Jogo 88', 'Mercedes-Benz Stadium, Atlanta'),
  (96, NULL, '2026-07-07', '13:00', 'Vencedor Jogo 85', 'Vencedor Jogo 87', 'BC Place, Vancouver'),
  (97, NULL, '2026-07-09', '16:00', 'Vencedor Jogo 89', 'Vencedor Jogo 90', 'Gillette Stadium, Boston'),
  (98, NULL, '2026-07-10', '12:00', 'Vencedor Jogo 93', 'Vencedor Jogo 94', 'SoFi Stadium, Los Angeles'),
  (99, NULL, '2026-07-11', '17:00', 'Vencedor Jogo 91', 'Vencedor Jogo 92', 'Hard Rock Stadium, Miami'),
  (100, NULL, '2026-07-11', '20:00', 'Vencedor Jogo 95', 'Vencedor Jogo 96', 'Arrowhead Stadium, Kansas City'),
  (101, NULL, '2026-07-14', '14:00', 'Vencedor Jogo 97', 'Vencedor Jogo 98', 'AT&T Stadium, Dallas'),
  (102, NULL, '2026-07-15', '15:00', 'Vencedor Jogo 99', 'Vencedor Jogo 100', 'Mercedes-Benz Stadium, Atlanta'),
  (103, NULL, '2026-07-18', '17:00', 'Perdedor Jogo 101', 'Perdedor Jogo 102', 'Hard Rock Stadium, Miami'),
  (104, NULL, '2026-07-19', '15:00', 'Vencedor Jogo 101', 'Vencedor Jogo 102', 'MetLife Stadium, Nova York/Nova Jersey')
on conflict (id) do nothing;

-- Resultado de hoje: África do Sul 0 x 1 Canadá (jogo 73)
insert into public.scores (match_id, home, away) values (73, 0, 1)
  on conflict (match_id) do update set home = excluded.home, away = excluded.away;
