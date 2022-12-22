FROM python:3.9.7

COPY ./requirements.txt /user/requirements.txt

WORKDIR /user

RUN pip install -r requirements.txt

COPY . /user

CMD ["python", "user.py"]