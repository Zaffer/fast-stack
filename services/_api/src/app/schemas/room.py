from datetime import datetime
from typing import List
from pydantic import BaseModel


class RoomEvent(BaseModel):
    id: str
    title: str
    description: str
    start: str
    end: str
    creator: dict = {"email": ""}


class RoomLogEvent(RoomEvent):
    participants: List


class CreateRoomEvent(BaseModel):
    summary: str
    description: str
    start: dict = {"dateTime": "", "timeZone": "Africa/Johannesburg"}
    end: dict = {"dateTime": "", "timeZone": "Africa/Johannesburg"}
    attendees: List[dict]
    recurrence: List[str] = None
    sendUpdates: str = None
    reminders: dict = {"overrides": [], "useDefault": False}


class UpdateEvent(CreateRoomEvent):
    id: str


class EventsRead(BaseModel):
    room_id: int
    email: str
    timeMin: datetime
    timeMax: datetime
