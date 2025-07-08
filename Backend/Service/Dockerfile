FROM python:3.9.7

# Set environment variables for HuggingFace cache
ENV HF_HOME=/app/.cache/huggingface
ENV TRANSFORMERS_CACHE=/app/.cache/huggingface/transformers
ENV HF_DATASETS_CACHE=/app/.cache/huggingface/datasets

COPY ./requirements.txt /service/requirements.txt

WORKDIR /service

RUN pip install -r requirements.txt && pip install gunicorn

# Create cache directory with proper permissions
RUN mkdir -p /app/.cache/huggingface && chmod 755 /app/.cache/huggingface

COPY . /service

# Expose the cache directory as a volume for persistence
VOLUME ["/app/.cache/huggingface"]

CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "service:app"]