USE railway;

UPDATE halls
SET name='Premium Reading Hall',
    description='Premium individual study hall with rectangle tables',
    purpose='Premium Reading',
    zone='A'
WHERE id=1;


UPDATE halls
SET name='Silent Study Hall',
    description='Silent zone for focused study',
    purpose='Silent Reading',
    zone='B'
WHERE id=2;


UPDATE halls
SET name='Research & Innovation Hall',
    description='Research and project discussion area',
    purpose='Research',
    zone='C'
WHERE id=3;


UPDATE halls
SET name='General Learning Hall',
    description='General purpose library hall',
    purpose='General Reading',
    zone='D'
WHERE id=4;