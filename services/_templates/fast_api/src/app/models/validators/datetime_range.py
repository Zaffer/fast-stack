from psycopg2.extras import DateTimeTZRange as DateTimeTZRangeBase

from pydantic.json import ENCODERS_BY_TYPE

ENCODERS_BY_TYPE |= {DateTimeTZRangeBase: str}

class DateTimeTZRange(DateTimeTZRangeBase):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if isinstance(v, str):
            try:
                lower = v.split(", ")[0][1:].strip().strip()
                upper = v.split(", ")[1][:-1].strip().strip()
                bounds = v[:1] + v[-1:]
            except IndexError:
                raise ValueError("Time range format is not valid, must be '[lower, upper]'")

            return DateTimeTZRange(lower, upper, bounds)
        elif isinstance(v, DateTimeTZRangeBase):
            return v
        raise TypeError("Type must be string or DateTimeTZRange")

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string", example="[2022-12-31T13:59:00+02:00, 2022-12-31T23:59:00+02:00)")
