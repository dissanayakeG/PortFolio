---
title: "Linux cheatSheet for PHP developers"
subtitle: "Linux cheatSheet for PHP developers"
date: "2025-04-17"
tags: "#Linux"
---

# Linux cheatSheet for PHP developers

<br>

# Text Processing Power Tools

## Grep

<br>

- grep stands for "Global Regular Expression Print".
- It’s a command-line tool used to search for text patterns inside files or output.

```bash
grep "pattern" filename
```

| Option  | What it does |
|---------|---------------|
-i 		 | Ignore case (e.g., Sunny = sunny)
-v 	 	 | Invert match (show lines not matching)
-r/-R     | Recursively search in directories
-n 		 | Show line numbers
-H 		 | Show the filename in the output (even if only one file is searched)
-l 		 | Show only filenames with matches
-L 		 | Show only the names of files without matches
-c 		 | Count matching lines
-o 		 | Print only the matched part of the line
-w 		 | Match whole words only
-x 		 | Match entire lines only
-E 		 | Use extended regular expressions (ERE)
-F 		 | Interpret pattern as a fixed string (no regex)
-P 		 | Interpret pattern as a Perl-compatible regex (PCRE; not available in all grep versions)
--color=auto   | Highlight matches in color (usually on by default in many distros)

### Examples

```bash
grep "ERROR" /var/log/app.log #Search in logs
grep -Hnir zend_extension /etc/php/8.2/ #Searching for the term zend_extension within files in the /etc/php/8.2/ directory and its subdirectories
grep "string" file.log > result.log #Find a string in a Linux file
grep -E "21:20:[0-5][0-9]\]  some text" file.log > result.log # Apply search pattern in string
tail -l 1000 | grep "string" fileName #List last 1000 line in a file by string
```

### print search result into a file

```bash
grep -E "21:20:[0-5][0-9]\]some text" file.log > result.log
```
<br>

## sed (stream editor)

<br>

### What sed Does

- Reads input line by line
- Applies editing commands (like substitute, delete, insert, etc.)
- Outputs the modified text (usually to stdout)

```bash
sed [OPTIONS] 'COMMAND' [FILE]
sed 's/old/new/' file #Substitute text
echo "hello world" | sed 's/world/universe/' #Output: hello universe
sed 's/old/new/g' file #Global replace
sed -i 's/old/new/g' file # In-place editing (modifies the file directly)

#You can also back it up like this:
sed -i.bak 's/old/new/g' file #This creates a file.bak backup
sed '/pattern/d' file #Delete lines
sed -n '/pattern/p' file #Print only matching lines
sed '2s/foo/bar/' file #Replace only on specific lines

#Get range
sed -n '/^21:19:[0-5][0-9]\]/,/^21:21:[0-5][0-9]\]/p' file.log > result4.txt
sed -E -n '/21:19:[0-5][0-9]\]/,/21:21:[0-5][0-9]\]/p' file.log > result4.txt
```

<br>

## awk

<br>

- awk is another powerful command-line tool like sed, but it’s better suited for working with structured text like columns in logs, CSVs, or space/tab-delimited data.

### What is awk?

- awk is a text-processing language.
- It reads files line by line, splits lines into fields, and performs actions based on patterns.
- Ideal for column-based operations, filtering, summarizing, and reporting.

```bash
#Basic Syntax
awk 'pattern { action }' file
awk '{print $1}' access.log #Print column from logs
```

## Finding Files or Directories by Name Using ls and find

| Goal    | Command | Matches |
|---------|---------|---------|
Exact match in current dir | ls -l test | Only test
Starts with in current dir | ls -l test* | test, test1, testfile
Exact match recursively | find . -name 'test' | Only test
Starts with recursively | find . -name 'test*' | test, test123, etc.
Case-insensitive recursive | find . -iname 'test*' | Test, TEST, etc.

<br>

# Process Management & System Monitoring

<br>

## lsof

<br>

- lsof stands for List Open Files. In Linux, everything is a file, including sockets, devices, and network connections — and lsof shows which files are currently open by which processes.

Here’s a list of commonly used <strong>lsof<strong> flags, along with short explanations for each:

## General Flags 
| Flag		| Description |
|-----------|-------------|
| -h		| Show help message |
| -v		| Show version and verbose info |
| -n		| Don't resolve hostnames (no DNS lookup) |
| -P		| Don't resolve port numbers to service names |
| -i		| Show network files (TCP, UDP, etc.) |

## Filtering by Protocol / Address

| Flag				  | Description |
|---------------|-------------|
| -i[proto]		  | Show only network files (optionally specify tcp, udp, etc.) |
| -i :port		  | Filter by port number (e.g. -i :8000) |
| -i @host		  | Filter by host IP (e.g. -i @127.0.0.1) |
| -i @host:port	| Filter by host and port |

## Filtering by File or Process

| Flag		  | Description |
|-----------|-------------|
| -p PID	| Show files opened by specific process ID |
| -u USER	| Show files opened by specific user |
| -c CMD	| Filter by command name |
| -t		    | Output only PIDs (useful for scripting) |
| +D dir	| Show all files under a directory (not recursive unless with +D) |
| +d dir	| Like +D, but not recursive |

## Output Control

| Flag		| Description |
|---------|-------------|
| -F		  | Output in parseable format (used in scripts) |
| -s		  | Show file sizes |
| -l		  | Show login names instead of user IDs |

### Examples

```bash
lsof -i :8080            # See what's using port 8080
lsof -i tcp@127.0.0.1    # Show TCP connections on localhost
lsof -p 1234             # Show open files for process ID 1234
lsof -u www-data         # Files opened by user www-data
lsof -t -i :3306         # Only show PIDs using port 3306
```

## Kill by task id

```bash
lsof -n -P -i | grep 8000
kill -9 ID

# The pipe (|) takes the output of the command on the left (lsof -n -P -i) and sends it as input to the command on the right (grep 8000).
# Think of | like connecting two tools: one gathers raw data (lsof), and the other filters it (grep).

# kill sends a signal to a process.
# -15	SIGTERM	Politely asks the process to terminate
# -9	SIGKILL	Forcefully kills the process immediately
# -9 doesn't allow the process to release resources or save state.
# Prefer kill PID (defaults to -15) first, and only use -9 if needed.
```

## Kill a Process by name

```bash
# pkill kills processes by name, rather than by process ID (PID).
pkill firefox
pkill -u www-data php      # Kill all PHP processes run by www-data
pkill -f "php artisan queue:work"  # Match full command line
pkill -x php               # Match exact process name only
```

## target specific processes

```bash
ps aux | grep firefox
kill PID
```

## kill queue process in linux

```bash
ps -aux | grep queue
kill -9 8118
```

## kill a serve on a port

```bash
kill $(lsof -t -i :PORT_NUMBER)
```

<br>

# Linux file commands

<br>

## append text to a file

```bash
echo "Your text here" >> filename.txt

# >> means append (does not overwrite).
#If the file doesn’t exist, it will create it.
```

## Append Multiple Lines (using cat + here-doc)

```bash
cat <<EOF >> filename.txt
Line 1
Line 2
Line 3
EOF
```

## Using tee with -a (append mode)

```bash
echo "Another line" | tee -a filename.txt
#Useful when you want to see the output and append it at the same time.
```

## Append command output to a file

```bash
ls -l >> files.txt

head -n 10 file.txt x`(get 10 lines of files)
split --lines=100000 file.txt folder/(separate text file into parts)

wc -l file.txt(get number of lines in file)
```

<br>

# .bashrc

<br>

 - .bashrc is a shell script that runs every time a new terminal session is started in interactive mode (like when you open a terminal in Ubuntu).

- It’s where you customize your shell environment, including aliases, environment variables, prompt styles, and more.

## Set Aliases (custom shortcuts)
```bash
alias ll='ls -alF'
alias art='php artisan'
alias serve='php -S localhost:8000'
```

## Export Environment Variables
```bash
export APP_ENV=local
export PATH=$PATH:/opt/some/custom/bin
```

## Show git branch name in the Terminal

```bash
force_color_prompt=yes
color_prompt=yes
parse_git_branch() {
 git branch 2> /dev/null | sed -e '/^[^]/d' -e 's/ \(.\)/(\1)/'
}
if [ "$color_prompt" = yes ]; then
 PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[01;31m\]$(parse_git_branch)\[\033[00m\]\$ '
else
 PS1='${debian_chroot:+($debian_chroot)}\u@\h:\w$(parse_git_branch)\$ '
fi
unset color_prompt force_color_prompt
```

## Run Scripts or Commands at Startup

```bash
echo "Welcome back, $USER!"   # A nice touch every time you open a terminal
```

## Reload bashrc

- After you make changes to your .bashrc file, you need to reload it in the current shell session for the changes to take effect.

```bash
source ~/.bashrc  OR . ~/.bashrc
```

<br>

# Shell Scripting (Bash)

<br>

```bash
# Create a script
nano myscript.sh

# Make it executable
chmod +x myscript.sh

# Run it
./myscript.sh

# Example loop
for i in {1..5}; do
  echo "Line $i"
done
```
<br>

# File Permissions & Ownership

<br>

## Linux File/Directory Permissions (Essentials)

- Every file/directory has 3 permission sets

| Role			  | Who it applies to         |
|-------------|---------------------------|
| User (u)		| The file owner            |
| Group (g)		| Users in the owner’s group|
| Others (o)	| Everyone else             |

## Permission Types: rwx

| Symbol	  | Meaning	  | Applies to |
|-----------|-----------|------------|
| r		      | read     	| Can view file content / list directory |
| w		      | write    	| Can edit file / create/delete in dir   |
| x		      | execute  	| Can run file / enter directory         |

## Number System (Octal)

Each rwx combo is mapped to a number:
| Permission	  | Binary | Value |
|---------------|--------|-------|
| r			        | 4      | 100 |
| w			        | 2      | 010 |
| x			        | 1      | 001 |

So:

- rwx = 4 + 2 + 1 = 7
- rw- = 4 + 2 = 6
- r-- = 4 = 4
- --- = 0 = 0

### Example: chmod 755 file.sh

Breakdown of 755:

| Who		  | Number	| rwx | Meaning                             |
|---------|---------|-----|-------------------------------------|
| User		| 7			  | rwx | Full access                         |
| Group		| 5			  | r-x | Read & execute (but can't write)    |
| Others	| 5			  | r-x | Read & execute                      |

So: owner can modify and run, others can only view and run.

## What does chmod 777 mean?

| Role    | rwx | Meaning                          |
|---------|-----|----------------------------------|
| User    | rwx | Can read, write, and execute     |
| Group   | rwx | Can read, write, and execute     |
| Others  | rwx | Can read, write, and execute     |

- Huge security risk if used on web apps!
- Gives everyone full access — only use temporarily for debugging.

## Common Commands

```bash
chmod 755 file.sh         # Make a script executable
chmod -R 775 storage/     # Laravel: Read/write for user and group
chown user:group file     # Change file owner and group
chmod a+rw file.txt       # Allow read+write to all (user, group, others)
```

## allow read and write permissions for all users

```bash
sudo chmod a+rw storage/logs/file.log
```

<br>

# Package Management

<br>

## List down all the installed apt packages

```bash
apt list --installed

snap package list
```

## Upgrade specific apt package

```bash
sudo apt-get install --only-upgrade <packagename>
or
sudo apt update && sudo apt <packagename>

Ex: sudo apt update && sudo apt upgrade google-chrome-stable
```

## Install a package

```bash
sudo apt install nginx
```

## Update & upgrade

```bash
sudo apt update && sudo apt upgrade
```

## Search for a package

```bash
apt search php
```

### Upgrade snap packages

```bash
sudo snap refresh package_1 package_2
```

for greater detail, check
<a>https://itsfoss.com/snap-update/</a>

## Installed location of an application

```bash
1. echo $PATH

2. sudo apt install mlocate 
   sudo updatedb
   locate studio.sh

3. cd /usr/share/applications/
   cat android-studio.desktop
   Location is -> Exec=.
```

<br>

# Linux Security & Hardening

<br>

## Enable firewall

```bash
sudo ufw enable
```

## Check firewall status

```bash
sudo ufw status
```

## Ban IP with fail2ban

```bash
sudo fail2ban-client set sshd banip 1.2.3.4
```

## Harden SSH access

```bash
sudo nano /etc/ssh/sshd_config
# Change: PermitRootLogin no
```

## Copy linux directory

```bash
sudo cp -r /path/to/directory

# -r means the directory will be copied recursively, content first, then the directory itself.
```

## mount directory as writable

```bash
sudo mount -o remount,rw /path/to/directory
```

<br>

# Systemd & Services

<br>

## Start a service

```bash
sudo systemctl start nginx
```

## Enable at boot

```bash
sudo systemctl enable php7.4-fpm
```

## Check status

```bash
sudo systemctl status apache2
```

<br>

# PHP Server Management

<br>

## Edit PHP config

```bash
sudo nano /etc/php/7.4/fpm/php.ini
```

## Restart PHP service

```bash
sudo systemctl restart php7.4-fpm
```

## Check logs

```bash
tail -f /var/log/nginx/error.log
```

<br>

# Logs & Monitoring

<br>

## View logs

```bash
tail -n 100 /var/log/syslog
```

## Live logs

```bash
journalctl -f
```

## Process monitor

```bash
htop  # sudo apt install htop
```
<br>

# Deployment Tools

<br>

## Copy files

```bash
rsync -avz ./site/ user@host:/var/www/site
```

## SSH to server

```bash
ssh user@host
```

## Automate deployment

```bash
nano deploy.sh
```