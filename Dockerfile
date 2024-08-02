# Use an official PHP runtime as a parent image
FROM php:8.2-cli

# Set the working directory
WORKDIR /usr/src/app

# Install necessary packages
RUN apt-get update && apt-get install -y wget unzip

# Download and install PocketMine-MP
RUN wget -q -O - https://get.pmmp.io | bash -s -

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Expose the port that PocketMine-MP will run on
EXPOSE 19132

# Run PocketMine-MP when the container launches
CMD ["./start.sh"]
