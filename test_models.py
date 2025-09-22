from brisk_backend.app.database import create_tables
from brisk_backend.app.models import *
print('Testing database models...')
create_tables()
print('Database models created successfully!')
