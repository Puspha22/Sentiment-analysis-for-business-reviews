FROM python:3.9.7

COPY ./requirements.txt /user/requirements.txt

WORKDIR /user

RUN pip install -r requirements.txt && pip install gunicorn

COPY . /user

CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "user:app"]