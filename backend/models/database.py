from ..init import db
from sqlalchemy.orm import Mapped, mapped_column



class DataBase(db): 
    __tablename__ = 'Data Base'
    id : Mapped[int] = mapped_column(primary_key=True)
    user_name: Mapped[str] = mapped_column()
    phone_number: Mapped[int] = mapped_column()
    door_logs: Mapped[int] = mapped_column()
    food_logs: Mapped[int] = mapped_column()
    water_logs: Mapped[int] = mapped_column() 
    

    