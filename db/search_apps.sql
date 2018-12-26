select * from apps where
app_name ILIKE concat('%',$1,'%')
or 
tags ILIKE concat('%',$1,'%')