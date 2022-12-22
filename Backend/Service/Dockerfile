FROM python:3.9.7

COPY ./requirements.txt /service/requirements.txt

WORKDIR /service

RUN pip install -r requirements.txt

COPY . /service

CMD ["python", "service.py"]