# Use the Prometheus base image
FROM prom/prometheus

# Copy the Prometheus configuration file to the container
COPY prometheus.yml /etc/prometheus/prometheus.yml

# Expose Prometheus port
EXPOSE 9090

# Set the entrypoint to start Prometheus with the given configuration file
ENTRYPOINT ["prometheus"]
CMD ["--config.file=/etc/prometheus/prometheus.yml", "--web.listen-address=:9090"]
