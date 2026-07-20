# AGENTS.md

Primary command:
python "%USERPROFILE%\mrdirector.py" status

Rules:
- Read ops/platform.yml.
- Never delete Docker volumes.
- Never run prune.
- Never expose secrets.
- Never claim live unless URL checks pass.
