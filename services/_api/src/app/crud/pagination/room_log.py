from typing import Generic, TypeVar, Sequence, Type, ClassVar


from fastapi_pagination import Params
from fastapi_pagination.bases import AbstractParams, AbstractPage

T = TypeVar("T")


class CustomPage(AbstractPage[T], Generic[T]):
    total: int
    pageNumber: int
    pageSize: int
    data: Sequence[T]

    __params_type__: ClassVar[Type[AbstractParams]] = Params

    @classmethod
    def create(
        cls: Type["CustomPage"],
        items: Sequence[T],
        total: int,
        params: AbstractParams,
    ) -> "CustomPage":
        if not isinstance(params, Params):
            raise ValueError

        return cls(
            data=items,
            total=total,
            pageNumber=params.page,
            pageSize=params.size,
        )
