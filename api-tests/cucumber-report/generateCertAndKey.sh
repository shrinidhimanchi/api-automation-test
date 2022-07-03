#!/bin/bash
set -e

if [ "$#" -ne 1 ]; then
    echo "Usage: $0 </path/to/p12/certificate>" >&2
    exit 1;
fi

