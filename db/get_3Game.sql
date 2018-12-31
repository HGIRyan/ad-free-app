select * 
from apps 
where tags 
ilike concat('%', $1, '%')