write-host "`n--------------------------------------------"
write-host " ##  Node.js and MongoDB install-helper  ## "
write-host "--------------------------------------------"
write-host "ATTENTION! If you encounter problems, try performing all the necessary installations manually."


### CONFIGURATION

# Node.js
$versionNodeJs = "12.18.2"
# MongoDB
$mongoDbPath = "C:\Program Files\MongoDB\Server\4.2\bin" 


### ACTIVATE INSALLATION

$install_node = $TRUE
$install_mongo = $TRUE


### SYSTEM CHEKING

write-host "`n----------------------------"
write-host " System requirements checking "
write-host "----------------------------"

if ([System.Environment]::Is64BitOperatingSystem) {
	$ostype = "x64"
	write-host "64-bit operating system defined"
} else {
	$ostype= "x86"
	write-host "32-bit operating system defined"
}


### CHECK ADMINISTRATOR RIGHTS

if (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
   write-Warning "This setup needs admin permissions. Please run this file as admin."     
   break
}

$url_node = "https://nodejs.org/dist/v$versionNodeJs/node-v$versionNodeJs-$ostype.msi"
$url_mongodb = "https://fastdl.mongodb.org/win32/mongodb-win32-x86_64-2012plus-4.2.8-signed.msi" 

$null = New-Item -ItemType "directory" -Path "$PSScriptRoot\..\downloads" -Force

### NODE.JS CHECK

if (Get-Command node -errorAction SilentlyContinue) {
    $current_version = (node -v)
}
 
if ($current_version) {
    write-host "Node.js $current_version already installed!"
    $install_node = $FALSE
}


### MONGODB CHECK

if (Test-Path -path $mongoDbPath) { 
	write-host "MongoDB already installed!"
	$install_mongo = $FALSE
}


### NODE.JS INSALLATION

if ($install_node) {

    $install_actions = $TRUE

    ### download nodejs msi file
    # warning : if a node.msi file is already present in the current folder, this script will simply use it
        
    write-host "`n----------------------------"
    write-host " Node.js '.msi' file retrieving  "
    write-host "----------------------------"

    $filename = "node.msi"
    $node_msi = "$PSScriptRoot\..\downloads\$filename"
    
    $download_node = $TRUE

    if (Test-Path $node_msi) {
        $confirmation = read-host "Local $filename file detected. Do you want to use it? [y/N] "
        if ($confirmation -eq "y") {
            $download_node = $FALSE
        }
    }

    if ($download_node) {
        write-host "Downloading Node.js install file..."
        write-host "url : $url_node"
        $start_time = Get-Date

        $wc = New-Object System.Net.WebClient
        $wc.DownloadFile($url_node, $node_msi)

        write-Output "$filename downloaded!"
        write-Output "Time taken: $((Get-Date).Subtract($start_time).Seconds) second(s)"
    } else {
        write-host "Using the existing $filename file"
    }

    ### nodejs install

    write-host "`n----------------------------"
    write-host " Node.js installation  "
    write-host "----------------------------"

    write-host "Running $node_msi"
   	Start-Process $node_msi '/qb /norestart' -Wait
    
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User") 
    
} else {
    write-host "Skipping installation Node.js. Used previously installed Node.js version."
}


### MONGODB INSALLATION

if ($install_mongo) {

	$install_actions = $TRUE

	### download mongodb msi file
    # warning : if a mongodb.msi file is already present in the current folder, this script will simply use it
        
    write-host "`n----------------------------"
    write-host " MongoDB '.msi' file retrieving  "
    write-host "----------------------------"

    $filename = "mongodb.msi"
    $mongodb_msi = "$PSScriptRoot\..\downloads\$filename"
    
    $download_mongodb = $TRUE

    if (Test-Path $mongodb_msi) {
        $confirmation = read-host "Local $filename file detected. Do you want to use it? [y/N] "
        if ($confirmation -eq "y") {
            $download_mongodb = $FALSE
        }
    }

    if ($download_mongodb) {
        write-host "Downloading MongoDB install file..."
        write-host "url : $url_mongodb"
        $start_time = Get-Date

        $wc = New-Object System.Net.WebClient
        $wc.DownloadFile($url_mongodb, $mongodb_msi)

        write-Output "$filename downloaded!"
        write-Output "Time taken: $((Get-Date).Subtract($start_time).Seconds) second(s)"
    } else {
        write-host "Using the existing $filename file"
    }

    ### mongodb install

    write-host "`n----------------------------"
    write-host " MongoDB installation  "
    write-host "----------------------------"

    ### See docs https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows-unattended/
    write-host "Running $mongodb_msi"
    Start-Process $mongodb_msi '/qb /norestart  ADDLOCAL="ServerService,Client,ImportExportTools"' -Wait
    
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User") 

} else {
    write-host "Skipping installation MongoDB. Used previously installed MongoDB version."
}


### CLEAN INSALLATION FILES

if ($install_actions) {
	write-host "`n----------------------------"
	write-host " System cleaning "
	write-host "----------------------------"

	$confirmation = read-host "Delete install files? [y/N] "
	if ($confirmation -eq "y") {
   		if ($node_msi -and (Test-Path $node_msi)) {
        	rm $node_msi
    	}
    	if ($mongodb_msi -and (Test-Path $mongodb_msi)) {
        	rm $mongodb_msi
    	}
    	if (Test-Path "$PSScriptRoot\..\downloads") {
        	rm "$PSScriptRoot\..\downloads"
    	}
	}
}

write-host "`nDone!"