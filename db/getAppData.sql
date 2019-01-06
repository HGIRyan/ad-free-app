select  d.developer_id,a.app_id, ad.time_of as date, sum(ad.view_render) as views, sum(ad.download) as downloads
from app_data ad
join apps a on ad.app_id = a.app_id
join developers d on a.developer_id = d.developer_id
where d.developer_id = $1 and a.app_id = $2

group by ad.app_id, ad.time_of,d.developer_id, a.app_id;
