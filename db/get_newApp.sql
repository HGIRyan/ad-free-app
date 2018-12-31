select * 
from apps 
where app_name 
ilike concat('%',$1,'%')