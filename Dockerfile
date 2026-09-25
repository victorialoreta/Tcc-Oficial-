FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY api/ ./api
COPY static/ ./static
COPY templates/ ./templates
COPY app.py .
CMD ["python", "app.py"]